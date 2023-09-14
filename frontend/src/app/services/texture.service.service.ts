import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextureService {
  selectedTexture: { name?: string; imageUrl?: string } | null = null;
}