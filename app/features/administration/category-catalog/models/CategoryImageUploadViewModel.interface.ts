export interface CategoryImageUploadViewModel {
  isSubmitting: boolean;
  upload: (
    categoryId: string,
    file: File
  ) => Promise<boolean>;
}
