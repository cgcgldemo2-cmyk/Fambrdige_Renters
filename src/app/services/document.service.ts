import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface DocumentUploadEntry {
  type: string;
  file: File;
}

export interface DocumentUploadResponse {
  message?: string;
  [key: string]: any;
}

export interface UploadedDocument {
  id: number;
  original: string;
  stored: string;
  type: string;
  batch_upload: string;
  secureUrl: string;
  status: string | null;
  verified_at: string | null;
  declined_at: string | null;
  created_at: string;
}

export interface VehicleDocumentGroup {
  id: number;
  reference: string;
  name: string;
  make: string;
  documents: Record<string, UploadedDocument[]>;
}

/** API returns a record keyed by document type, each value is an array of documents */
export type UploadedDocumentsResponse = Record<string, UploadedDocument[]> | [];

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  /**
   * Upload documents for a user.
   * Sends multipart/form-data with paired types[] and files[] arrays.
   * @param email  The user's email address
   * @param documents  Array of { type, file } pairs to upload
   */
  uploadDocuments(email: string, documents: DocumentUploadEntry[], vehicleId?: string): Observable<DocumentUploadResponse> {
    const token = sessionStorage.getItem('access_token') || '';
    const formData = new FormData();

    formData.append('email', email);
    if (vehicleId) {
      formData.append('vehicle_id', vehicleId);
    }
    documents.forEach(doc => {
      formData.append('types[]', doc.type);
      formData.append('files[]', doc.file);
    });

    return this.http.post<DocumentUploadResponse>(
      `${this.baseUrl}${environment.lessorDocumentUploadPath}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  /**
   * Fetch all uploaded documents for the authenticated user.
   * Returns a flat array of documents, flattened from the grouped API response.
   */
  getDocuments(): Observable<UploadedDocument[]> {
    const token = sessionStorage.getItem('access_token') || '';
    return this.http.get<UploadedDocumentsResponse>(
      `${this.baseUrl}/api/my-documents-uploaded`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).pipe(
      map(response => {
        if (Array.isArray(response)) return [];
        return Object.values(response).flat();
      })
    );
  }

  getDocumentsByEmail(email: string): Observable<UploadedDocument[]> {
    const token = sessionStorage.getItem('access_token') || '';
    return this.http.get<Record<string, UploadedDocument[]>>(
      `${this.baseUrl}/api/landlord/user/documents?email=${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).pipe(
      map(response => Object.values(response || {}).flat())
    );
  }

  getVehicleDocumentsByEmail(email: string): Observable<VehicleDocumentGroup[]> {
    const token = sessionStorage.getItem('access_token') || '';
    return this.http.get<{ vehicles: VehicleDocumentGroup[] }>(
      `${this.baseUrl}/api/landlord/user/documents?email=${encodeURIComponent(email)}&scope=vehicle`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).pipe(
      map(response => response.vehicles || [])
    );
  }
}
