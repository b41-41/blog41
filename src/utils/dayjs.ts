import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 플러그인 추가
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * UTC 시간을 사용자의 로컬 시간대에 맞게 변환
 * @param date 변환할 날짜 문자열 또는 Date 객체
 * @param format 출력 포맷 (기본값: YYYY.MM.DD)
 * @returns 포맷된 로컬 시간 문자열
 */
export const formatToLocalTime = (date: string | Date, format: string = 'YYYY.MM.DD') => {
  // UTC 시간을 로컬 시간대로 자동 변환
  return dayjs.utc(date).local().format(format);
};

/**
 * UTC 시간을 사용자의 로컬 시간대에 맞게 변환하고 시간까지 표시
 * @param date 변환할 날짜 문자열 또는 Date 객체
 * @returns 포맷된 로컬 시간 문자열 (YYYY.MM.DD HH:mm)
 */
export const formatToLocalTimeWithTime = (date: string | Date) => {
  return formatToLocalTime(date, 'YYYY.MM.DD HH:mm');
};

export default dayjs;
