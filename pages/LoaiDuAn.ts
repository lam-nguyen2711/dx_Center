import { Page, Locator } from '@playwright/test';

export class LoaiDuAn{
  readonly page: Page;
  readonly menuDanhMuc: Locator;
  readonly loaiDuAn: Locator;
  readonly inputTimKiem: Locator;

  constructor(page: Page) {
    this.page = page;
    // 1. Menu cha: Danh mục
    this.menuDanhMuc = page.locator('span[title="Danh mục"]');
    // 2. Menu con: Loại dự án
    this.loaiDuAn = page.locator('a[href*="danh-muc/loai-du-an"]');
    // Tìm kiếm loại dự án
    this.inputTimKiem = page.getByPlaceholder('Tìm kiếm...');
  }

  // Hành động: Click vào menu Quản lý dự án (loại dự án)
  async clickLoaiDuAn() {
    // Bước 1: Ép click trực tiếp vào menu cha "Danh mục" bằng JavaScript nội bộ
    await this.menuDanhMuc.evaluate((el) => (el as HTMLElement).click());
    // Chờ một chút để hiệu ứng mở menu hoàn tất
    await this.page.waitForTimeout(500); 
    // Bước 2: Ép click trực tiếp vào menu con "Loại dự án" bằng JavaScript nội bộ
    await this.loaiDuAn.evaluate((el) => (el as HTMLElement).click());
  }
  
  // Hàm tìm loại dự án
  async nhapTuKhoaTimKiem(tuKhoa: string) {
    // Xóa trắng ô tìm kiếm trước khi nhập (đề phòng có chữ cũ)
    await this.inputTimKiem.clear();
    // Nhập từ khóa mới
    await this.inputTimKiem.fill(tuKhoa);
    // Chờ hệ thống tự động lọc kết quả (Thường các form dạng này sẽ tự lọc sau khi gõ)
    // Nếu phải nhấn Enter mới tìm, hãy bỏ comment dòng dưới:
    // await this.page.keyboard.press('Enter');
    // Đợi một chút để bảng dữ liệu cập nhật xong
    await this.page.waitForTimeout(1000); 
  }
}