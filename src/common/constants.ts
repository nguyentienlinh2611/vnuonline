export const URL_DAOTAO = "https://daotao.vnu.edu.vn/";
export const URL_DAOTAO_STDINFO = "https://daotao.vnu.edu.vn/StdInfo/TabStdInfo.asp";
export const URL_DAOTAO_SCRINFO = "https://daotao.vnu.edu.vn/ListPoint/listpoint_Brc1.asp";
export const URL_DANGKYHOC = "http://dangkyhoc.vnu.edu.vn";
export const URL_DANGKYHOC_SUBINFO = "http://dangkyhoc.vnu.edu.vn/xem-va-in-ket-qua-dang-ky-hoc/1?layout=main";
export const REGEX_PERSONAL_INFO = /Mã sinh viên:\s*([0-9]*).*\nHọ và tên:\s*(.*)\sGiới tính:\s*(.*)\s*\nNgày sinh:\s*([0-9|/]*).*\n.*\n.*Quốc tịch:\s*(.*)\n.*\nNguyên quán:\s*(.*)HK thường trú.*\nNơi ở hiện nay:\s*(.*)\s*Địa chỉ liên lạc:.*\n.*\nĐT di động:\s*([0-9]*)\s*Thư điện tử:\s*(.*)/g;
export const REGEX_EDUCATION_INFO = /MÃ (\d*).*(HK[a-zA-Z| -|0-9]*)\s*[0-9]*\s*([0-9|.]*)\s*([0-9|.]*)\s*/g;
export const REGEX_TERM_INFO = /(HỌC KỲ .*) MÃ HỌC KỲ ([0-9]*)/;
