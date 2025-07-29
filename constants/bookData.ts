
import { Book } from '../types';
import { part1Content } from './parts/part1Content';
import { part2Content } from './parts/part2Content';
import { part3Content } from './parts/part3Content';
import { part4Content } from './parts/part4Content';
import { part5Content } from './parts/part5Content';
import { part6Content } from './parts/part6Content';
import { part7Content } from './parts/part7Content';
import { part8Content } from './parts/part8Content';
import { part9Content } from './parts/part9Content';

export const bookData: Book = {
  bookTitle: "إدارة وتشغيل الباك-إند على VPS – من الصفر للاحتراف",
  arabicBookTitle: "إدارة وتشغيل الباك-إند على VPS – من الصفر للاحتراف",
  parts: [
    part1Content,
    part2Content,
    part3Content,
    part4Content,
    part5Content,
    part6Content,
    part7Content,
    part8Content,
    part9Content
  ]
};
