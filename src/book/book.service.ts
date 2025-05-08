import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';  // Ensure Prisma is imported for QueryMode

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new book
  async create(createBookDto: CreateBookDto) {
    return await this.prisma.book.create({ data: createBookDto });
  }

  // Get all books with filtering, pagination, sorting, and ordering
  async findAll({
    filter,
    page = 1,
    limit = 10,
    sortBy = 'name',
    order = 'asc',
  }: {
    filter?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    const skip = (page - 1) * limit;

    // Applying filter if provided
    const where: Prisma.bookWhereInput = filter
      ? {
          name: {
            contains: filter,
            mode: Prisma.QueryMode.insensitive, // Ensuring case-insensitive search
          },
        }
      : {};

    // Fetching books from the database
    const books = await this.prisma.book.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order, // Sorting dynamically based on the field
      },
    });

    return books;
  }

  // Find a single book by ID
  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  // Update a book by ID
  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  // Remove a book by ID
  remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
