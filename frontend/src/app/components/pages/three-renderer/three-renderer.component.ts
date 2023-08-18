import { Component, ElementRef, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CartService } from '../../../services/cart.service';
import { Productos } from 'src/app/shared/models/Productos';

@Component({
  selector: 'app-three-renderer',
  templateUrl: './three-renderer.component.html',
  styleUrls: ['./three-renderer.component.css']
})
export class ThreeRendererComponent implements AfterViewInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private book!: THREE.Group;
  private controls!: OrbitControls;
  private coverTextures: THREE.Texture[];
  private pagesTexture: THREE.Texture;

  private selectedTextureIndex: number = 0;

  constructor(private el: ElementRef, private cartservice:CartService) {
    this.coverTextures = [
      new THREE.TextureLoader().load('assets/book_cover_texture1.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture2.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture3.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture4.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture5.jpg'),
      // Agrega más texturas de cubierta según necesites
    ];
    this.pagesTexture = new THREE.TextureLoader().load('assets/book_pages_texture.jpg');
  }

  ngAfterViewInit(): void {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initBook();
    this.initControls();
    this.render();
  }
  
  private initCamera(): void {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 5;
  }
  
  private initRenderer(): void {
    const renderWidth = window.innerWidth / 1.5; 
    const renderHeight = window.innerHeight /1.5;
  
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(renderWidth, renderHeight);
    this.el.nativeElement.appendChild(this.renderer.domElement);
  }
  private initScene(): void {
    this.scene = new THREE.Scene();
  }

  private initBook(): void {
    this.book = new THREE.Group();

    const coverGeometry = new THREE.BoxGeometry(5, 7.6, 0.2);
    const coverMaterial = new THREE.MeshBasicMaterial({ map: this.coverTextures[0] }); // Usar la primera textura
    const cover = new THREE.Mesh(coverGeometry, coverMaterial);
    this.book.add(cover);

    // Páginas en la parte inferior y abajo del libro
      // Páginas en la parte inferior y abajo del libro
      const pagesTexture = new THREE.TextureLoader().load('assets/book_pages_texture.jpg');
      const pagesGeometry = new THREE.BoxGeometry(4.8, 0.1, 0.05); // Ancho, alto, profundidad
      const pagesMaterial = new THREE.MeshBasicMaterial({ map: pagesTexture });
  
  
         // Páginas del libro en el lateral derecho
      const pagesTextureL = new THREE.TextureLoader().load('assets/book_pages_texture.jpg');
      const pagesGeometryL = new THREE.BoxGeometry(0.1, 7.4, 0.1);
      const pagesMaterialL = new THREE.MeshBasicMaterial({ map: pagesTextureL });
      const pages = new THREE.Mesh(pagesGeometryL, pagesMaterialL);
      pages.position.set(2.45, 0, 0); // Lateral derecho
      this.book.add(pages);

  
      // Parte inferior
      const pagesBottom = new THREE.Mesh(pagesGeometry, pagesMaterial);
      pagesBottom.rotation.x = -Math.PI / 2; // Girar hacia abajo
      pagesBottom.position.set(0, -3.8, 0); // En la parte inferior del libro
      this.book.add(pagesBottom);
  
  
      // Parte de abajo
      const pagesUnder = new THREE.Mesh(pagesGeometry, pagesMaterial);
      pagesUnder.rotation.x = Math.PI / 2; // Girar hacia arriba
      pagesUnder.position.set(0, 3.8, 0); // En la parte de abajo del libro
      this.book.add(pagesUnder);
  
  

    this.scene.add(this.book);
  }

  private initControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableRotate = true;
    this.controls.autoRotate = false;
  }

  changeTexture(coverTextureIndex: number): void {
    this.selectedTextureIndex = coverTextureIndex;
    if (coverTextureIndex >= 0 && coverTextureIndex < this.coverTextures.length) {
      const coverMesh = this.book.children.find(child => child instanceof THREE.Mesh) as THREE.Mesh;
      if (coverMesh) {
        if (coverMesh.material instanceof THREE.MeshBasicMaterial) {
          coverMesh.material.map = this.coverTextures[coverTextureIndex];
          coverMesh.material.needsUpdate = true;
        }
      }
    }
  }

  private render(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  addToCart(): void {
    const selectedTextureName = this.getTextureName(this.selectedTextureIndex);
    const productName = `Empastado - ${selectedTextureName}`;
    // Crea el producto con la textura actualmente seleccionada
    const producto: Productos = {
      id: '20', // Asigna un ID adecuado
      name: productName, // Asigna un nombre adecuado
      price: 35, // Asigna un precio adecuado
      imageUrl: this.coverTextures[this.selectedTextureIndex].image.src // Obtiene la URL de la textura seleccionada
    };

    this.cartservice.addToCart(producto);
  }
  getTextureName(index: number): string {
    const textureNames = ['Café texturizado', 'Cuerina', 'Verde oscuro texturizado', 'Rojo sangre', 'Rojo sangre portada'];
    return textureNames[index];
  }

}


