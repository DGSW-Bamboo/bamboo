import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { newStoryInput, StoryFilter, StoryFilterForAdmin } from './story.input';
import { Story, StoryDocument } from './story.model';
import { StoryState } from './story.type';

const datePropertyByStoryState = {
  [StoryState.APPROVED]: "approvedAt",
  [StoryState.REJECTED]: "rejectedAt",
} as const;

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
  ) {}

  getStoriesByFilter(filter?: StoryFilter) {
    const { offset = 0, limit = 20 } = filter ?? {};
    return this.storyModel.find({ state: StoryState.APPROVED }).skip(offset).limit(limit).exec();
  }

  getStoryById(id: Story['_id']) {
    return this.storyModel.findById(id).exec();
  }

  createStory(input: newStoryInput) {
    return this.storyModel.create(input);
  }

  getStoriesByFilterForAdmin(filter: StoryFilterForAdmin) {
    const { state, offset, limit } = filter;
    return this.storyModel.find({ state }).skip(offset).limit(limit).exec();
  }

  async changePendingStoryStateById(storyId: Story['_id'], nextState: StoryState) {
    const found = await this.storyModel.findOne({ _id: storyId, state: StoryState.PENDING });
    if (!found) {
      throw new HttpException('Story Not Found', HttpStatus.NOT_FOUND);
    }
    found.state = nextState;
    found[datePropertyByStoryState[nextState]] = new Date();
    await found.save();
    return found;
  }
}
