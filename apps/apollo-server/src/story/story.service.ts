import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StoryFilter, StoryFilterForAdmin, StoryInput } from './story.input';
import { Story, StoryDocument } from './story.model';
import { StoryState } from './story.type';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
  ) {}

  getAllStories(filter?: StoryFilter) {
    const { offset = 0, limit = 20 } = filter ?? {};
    return this.storyModel.find({ state: StoryState.APPROVED }).skip(offset).limit(limit).exec();
  }

  getStoryById(id: Story['_id']) {
    return this.storyModel.findById(id).exec();
  }

  createStory(input: StoryInput) {
    return this.storyModel.create(input);
  }

  getStoriesByFilter(filter: StoryFilterForAdmin) {
    const { state, offset, limit } = filter;
    return this.storyModel.find({ state }).skip(offset).limit(limit).exec();
  }
}
