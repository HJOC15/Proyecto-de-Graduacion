import { Component, ElementRef, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initBook();
    this.initControls();
    this.render();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
  }

  private initCamera(): void {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
  }

  private initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  private initBook(): void {
    this.book = new THREE.Group();

    // Cubierta del libro con logo
    const coverTexture = new THREE.TextureLoader().load('assets/book_cover_texture.jpg');
    const coverGeometry = new THREE.BoxGeometry(5, 7.6, 0.2);
    const coverMaterial = new THREE.MeshBasicMaterial({ map: coverTexture });
    const cover = new THREE.Mesh(coverGeometry, coverMaterial);
    this.book.add(cover);

    // Logo en la cubierta frontal
    const logoTexture = new THREE.TextureLoader().load('assets/logo_libro.png');
    const logoGeometry = new THREE.PlaneGeometry(5, 7.6);
    const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0, 0.101); // Ligeramente por delante de la cubierta
    this.book.add(logo);

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

  private render(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}


