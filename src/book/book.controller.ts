import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  // Modified findAll method with filtering, pagination, sorting, and ordering
  @Get()
  findAll(
    @Query('filter') filter: string, // Filter query parameter
    @Query('page') page: number = 1, // Pagination - default to page 1
    @Query('limit') limit: number = 10, // Pagination - default to 10 items per page
    @Query('sortBy') sortBy: string = 'name', // Sorting field - default by 'name'
    @Query('order') order: 'asc' | 'desc' = 'asc', // Sorting order - default to 'asc'
  ) {
    return this.bookService.findAll({
      filter,
      page,
      limit,
      sortBy,
      order,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
