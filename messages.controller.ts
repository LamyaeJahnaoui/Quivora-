import { Controller, Post, Body, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(@Body() body: { email: string; subject: string; content: string }) {
    return this.messagesService.sendMessage(body);
  }

  @Get()
  async getAllMessages() {
    return this.messagesService.getAllMessages();
  }
}
