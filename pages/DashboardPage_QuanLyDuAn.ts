import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly menuQuanLyDuAn: Locator;

  constructor(page: Page) {
    this.page = page;
    // Tìm phần tử menu có chứa chữ "Quản lý dự án". 
    // exact: true giúp Playwright tìm chính xác cụm từ này, không bị nhầm với cụm từ chứa nó.
    this.menuQuanLyDuAn = page.getByRole('link', { name: 'Quản lý dự án' });
  }

  // Hành động: Click vào menu Quản lý dự án
  async clickQuanLyDuAn() {
    await this.menuQuanLyDuAn.click();
  }
}