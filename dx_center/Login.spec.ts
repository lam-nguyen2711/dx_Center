import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPages';
import { DashboardPage } from '../pages/DashboardPage_QuanLyDuAn';
import { LoaiDuAnPage } from '../pages/ThemLoaiDuAn';
// Import các thư viện đọc file của Node.js
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';


// 1. Khai báo chính xác tên 3 cột có trong file CSV của bạn
type LoaiDuAnCSV = {ten: string; ma: string; moTa: string};

// 2. Ép kiểu dữ liệu (as LoaiDuAnCSV[]) ở cuối hàm parse
const duLieuCSV = parse(fs.readFileSync(path.join(process.cwd(), 'du-lieu-test.csv')), {
  columns: true,
  skip_empty_lines: true
}) as LoaiDuAnCSV[];


test('Kiểm thử tự động - Đăng nhập DXCenter với POM', async ({ page }) => {

  // ---- PHẦN 1: ĐĂNG NHẬP ----  
  // Khởi tạo đối tượng LoginPage
  const loginPage = new LoginPage(page);
  // 1. Mở trang đăng nhập
  await loginPage.goto();
  // 2. Gọi hàm đăng nhập và truyền tài khoản/mật khẩu vào
  await loginPage.login('trinh.vo', 'abcd@1234');
  // 3. Kiểm tra URL thay đổi sau khi đăng nhập thành công
  await expect(page).toHaveURL(/.*giao-viec\/thong-ke-giao-viec-ca-nhan.*/);

  // ---- PHẦN 2: THAO TÁC TRÊN TRANG CHỦ ----
  // Khởi tạo đối tượng DashboardPage
  const dashboardPage = new DashboardPage(page);
  // Click vào menu Quản lý dự án
  await dashboardPage.clickQuanLyDuAn();
  // (Tuỳ chọn) Kiểm tra xem đã chuyển sang trang Quản lý dự án chưa
  // Ví dụ: Kiểm tra URL có chứa chữ quan-ly-du-an hoặc kiểm tr a một thẻ Heading xuất hiện
  // Bạn có thể sửa lại đoạn URL dưới đây cho đúng với URL thực tế của trang web khi bấm vào menu
  await expect(page).toHaveURL(/.*quan-ly-du-an.*/);
  await expect(page.getByText('Biểu đồ Dự án mới theo bước thực hiện')).toBeVisible({ timeout: 15000 });

  // Tìm thẻ/khối chứa text "Dự án chuyển tiếp", sau đó tìm nút/chữ "Xem thêm →" bên trong và click
  await page.locator('div').filter({ hasText: /^Dự án chuyển tiếp/ }).getByText('Xem thêm →').click();
  // Click vào nút "Trở về Dự án chuyển tiếp"
  await page.getByRole('button', { name: 'Trở về' }).click();
  // dự án cần xử lý
  await page.getByRole('button', { name: /^Dự án cần xử lý/ }).getByText('Xem thêm →').click();
  // Click vào nút "Trở về Dự án cần xử lý"
  await page.getByRole('button', { name: 'Trở về' }).click();
  // tổng dự án
  await page.getByRole('button', { name: /^Tổng dự án/ }).getByText('Xem thêm →').click();
  // Click vào nút "Trở về tổng dự án"
  await page.getByRole('button', { name: 'Trở về' }).click();
  // Dự án mới
  await page.getByRole('button', { name: /^Tổng dự án/ }).getByText('Xem thêm →').click();
  // Click vào nút "Trở về dự án mới"
  await page.getByRole('button', { name: 'Trở về' }).click();

  // đánh gi

  // ---- PHẦN 3: THÊM LOẠI DỰ ÁN ----
  // Vào trang Quản lý dự án / Thêm loại dự án
  // const loaiDuAnPage = new LoaiDuAnPage(page);
  // await loaiDuAnPage.goto();
  // for (const duAn of duLieuCSV) {
  //   console.log(`Đang thêm dự án: ${duAn.ten}`);
  //   // Click nút Thêm mới (nếu popup tự đóng, cần click lại nút Thêm mới ở đây nếu vòng lặp tiếp theo cần mở popup)
  //   await loaiDuAnPage.themLoaiDuAn(duAn.ten, duAn.ma, duAn.moTa);
  //   // Chờ popup lưu thành công biến mất
  //   await expect(loaiDuAnPage.btnLuu).toBeHidden({ timeout: 10000 });
  // }
});





