import { Page, Locator } from '@playwright/test';

export class DS_DanhGiaKetThuc {
  readonly page: Page;
  readonly danhGiaKetThuc: Locator;

  constructor(page: Page) {
    this.page = page;
    // Tìm phần tử menu có chứa chữ "Quản lý dự án". 
    // exact: true giúp Playwright tìm chính xác cụm từ này, không bị nhầm với cụm từ chứa nó.
    this.danhGiaKetThuc = page.getByText('Đánh giá kết thúc', { exact: true });
  }

  // Hành động: Click vào menu Quản lý dự án
  async clickDSDanhGiaKetThuc() {
    await this.danhGiaKetThuc.click();
  }
}