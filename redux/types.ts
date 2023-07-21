export interface ImageType {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface PhotosState {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: ImageType[];
  error: string | undefined;
  search: string;
  oldSearches: string[];
}
export interface PhotosResponse {
  photos: PhotosState;
  stat: string;
}
