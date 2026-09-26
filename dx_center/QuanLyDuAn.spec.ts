import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPages';
import { DashboardPage } from '../pages/DashboardPage_QuanLyDuAn';
import { DS_DanhGiaKetThuc } from '../pages/ListDanhGiaKetThuc';
import { LoaiDuAn } from '../pages/LoaiDuAn';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// 1. Khai báo chính xác tên 3 cột có trong file CSV của bạn
type LoaiDuAnCSV = { tuKhoa: string; trangThaiMongDoi: string };

// 2. Ép kiểu dữ liệu (as LoaiDuAnCSV[]) ở cuối hàm parse
const duLieuCSV = parse(fs.readFileSync(path.join(process.cwd(), 'du-lieu-tim-kiem.csv')), {
  columns: true,
  skip_empty_lines: true
}) as LoaiDuAnCSV[];

test('Kiểm thử tự động - Danh sách đánh giá kết thúc', async ({ page }) => {
  // ---- PHẦN 1: ĐĂNG NHẬP ----  
  // Khởi tạo đối tượng LoginPage
  const loginPage = new LoginPage(page);
  // 1. Mở trang đăng nhập
  await loginPage.goto();
  // 2. Gọi hàm đăng nhập và truyền tài khoản/mật khẩu vào
  await loginPage.login('trinh.vo', 'abcd@1234');
  // 3. Kiểm tra URL thay đổi sau khi đăng nhập thành công
  await expect(page).toHaveURL(/.*giao-viec\/thong-ke-giao-viec-ca-nhan.*/);

  // Vào Quản lý dự án
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickQuanLyDuAn();

  // ---- PHẦN 2: DANH SÁCH ĐÁNH GIÁ KẾT THÚC ----  
  const ds_Danh_gia_ket_thuc = new DS_DanhGiaKetThuc(page);
  await ds_Danh_gia_ket_thuc.clickDSDanhGiaKetThuc();

  // ---- PHẦN 3: DANH SÁCH LOẠI DỰ ÁN ----  
  const loaiDuAn = new LoaiDuAn(page);
  await loaiDuAn.clickLoaiDuAn();

  // ---- PHẦN 4: TÌM KIẾM LOẠI DỰ ÁN ----  
  // Vòng lặp duyệt qua từng dòng dữ liệu CSV
  for (const row of duLieuCSV) {
      const loaiDuAnPage = new LoaiDuAn(page);
      // Thực hiện tìm kiếm
      await loaiDuAnPage.nhapTuKhoaTimKiem(row.tuKhoa);
      // Kiểm tra kết quả hiển thị trên bảng
      if (row.trangThaiMongDoi === 'co_ket_qua') {
        // Kỳ vọng trên bảng xuất hiện text của từ khóa
        await expect(page.locator('table')).toContainText(row.tuKhoa);
      } else {
        // 1. Kiểm tra bảng KHÔNG chứa từ khóa (như cũ)
        await expect(page.locator('table')).not.toContainText(row.tuKhoa);
        // 2. Tối ưu: Kiểm tra bảng HIỂN THỊ dòng chữ báo trống
        await expect(page.getByText('Không có dữ liệu')).toBeVisible({ timeout: 5000 });
      }
    };
  
});

