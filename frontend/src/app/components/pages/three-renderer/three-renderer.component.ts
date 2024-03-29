import { Component, ElementRef, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CartService } from '../../../services/cart.service';
import { Productos } from 'src/app/shared/models/Productos';
import { Text } from '@angular/compiler';
import { TextureService } from 'src/app/services/texture.service.service';
import { Router } from '@angular/router';
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
  private logoTexture: THREE.Texture;
  text: THREE.Texture;
  router: any;

  constructor(private el: ElementRef, private cartservice:CartService, 
    private textureService: TextureService) {
    this.coverTextures = [
      new THREE.TextureLoader().load('assets/book_cover_texture1.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture2.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture3.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture4.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture6.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture7.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture8.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture9.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture10.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture11.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture12.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture13.jpg'),
      new THREE.TextureLoader().load('assets/book_cover_texture14.jpg'),
      
      // Agrega más texturas de cubierta según necesites
    ];
    this.text = new THREE.TextureLoader().load('assets/TextoHD.png')
    this.pagesTexture = new THREE.TextureLoader().load('assets/book_pages_texture.jpg');
    this.logoTexture = new THREE.TextureLoader().load('');
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
    const textureName = this.getTextureName(coverTextureIndex);
    const textureImageUrl = this.coverTextures[coverTextureIndex].image.src;
  
    this.textureService.selectedTexture = {
      name: textureName,
      imageUrl: textureImageUrl,
    };

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

  
  getTextureName(index: number): string {
    const textureNames = ['Café texturizado', 'Cuerina', 'Verde oscuro texturizado',
     'Rojo sangre', 'Morado Texturizado', 'Amarillo Mostaza', 'Celeste', 'Azul Texturizado', 'Aqua', 'Rosado Pastel', 'Rojo', 'Verde', 'Azul oscuro'];
    return textureNames[index];
  }

  addLogo(event: any, coverTextureIndex: number): void {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const logoTexture = new THREE.TextureLoader().load(e.target?.result as string);

            this.logoTexture = logoTexture;

            const coverMesh = this.book.children.find(child => child instanceof THREE.Mesh) as THREE.Mesh;
            if (coverMesh && coverMesh.material instanceof THREE.MeshBasicMaterial) {
                // Aplicar la textura como logo
                this.adjustLogo(coverMesh, logoTexture, 2, 2, 0, 2, 0.1111111);
                this.adjustLogo(coverMesh, this.text, 7, 6, 0, -0.5, 0.1111111);
            }
        };

        // Lee el contenido de la imagen
        reader.readAsDataURL(file);
    }
}

createCombinedMaterial(baseTexture: THREE.Texture | null, overlayTexture: THREE.Texture): THREE.Material {
  // Crea un material personalizado que combina las dos texturas
  const material = new THREE.MeshBasicMaterial({
      map: baseTexture || null, // Textura de la cubierta original como base, o null si es nula
      transparent: true, // Permite la transparencia
      opacity: 1, // Ajusta la opacidad según sea necesario
  });

  // Agrega la textura del logo como un mapa de transparencia
  material.alphaMap = overlayTexture;
  material.alphaMap.wrapS = THREE.RepeatWrapping;
  material.alphaMap.wrapT = THREE.RepeatWrapping;

  return material;
}
getBookCover(): THREE.Mesh | null {
  // En este ejemplo, asumimos que la portada del libro es el primer hijo del libro.
  return this.book.children[0] instanceof THREE.Mesh ? this.book.children[0] as THREE.Mesh : null;
}

adjustLogo(coverMesh: THREE.Mesh, logoTexture: THREE.Texture, width: number, height: number, x :number,
  y:number, z:number): void {


  // Calcula el tamaño deseado para el logo (puedes ajustar estos valores)
  const logoWidth = width // Ancho del logo
  const logoHeight = height; // Altura del logo

  // Crea un plano para el logo con las dimensiones deseadas
  const logoGeometry = new THREE.PlaneGeometry(logoWidth, logoHeight);
  const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true, opacity: 1 });

  // Crea una malla para el logo
  const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);

  // Ajusta la posición del logo (en el centro)
  logoMesh.position.set(x, y, z); // Ajusta la posición según tus necesidades

  // Ajusta la rotación para que el logo solo se muestre por el frente
  logoMesh.rotation.set(0, 0, 0); // Ajusta la rotación según tus necesidades

  // Agrega el logo como un hijo de la geometría de la portada
  coverMesh.add(logoMesh);
}
completarPedido(): void {
  this.router.navigate(['/pedido']); // Assuming the route for PedidoComponent is '/pedido'
}

}


