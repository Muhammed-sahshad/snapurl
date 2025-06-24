import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './schemas/url.schema';
import { Model } from 'mongoose';

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async create(originalUrl: string, userId: string): Promise<Url> {
    const isExisting = await this.urlModel.findOne({ originalUrl, userId });
    if (isExisting) throw new ConflictException('This URL has already been shortened.');
    const shortCode = Math.random().toString(36).substring(2, 8);
    const newUrl = new this.urlModel({ originalUrl, shortCode, userId });
    return newUrl.save();
  }

  async findAllByUser(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [items, totalItems] = await Promise.all([
      this.urlModel
        .find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.urlModel.countDocuments({ userId }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        currentPage: page,
        totalPages,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findByShortCode(code: string): Promise<Url | null> {
    return this.urlModel.findOne({ shortCode: code }).exec();
  }
}
