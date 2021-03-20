import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { StoryFilter, StoryInput } from './story.input';
import { Story } from './story.model';
import { StoryService } from './story.service';

@Resolver()
export class StoryResolver {
  constructor(
    private storyService: StoryService
  ) {}

  @Query(() => [Story])
  async getAllStories(
    @Args('filter', { type: () => StoryFilter, nullable: true }) filter: StoryFilter,
  ) {
    return this.storyService.getAllStories(filter);
  }

  @Query(() => Story)
  async getStoryById(
    @Args('id', { type: () => ID }) id: Story['_id'],
  ) {
    return this.storyService.getStoryById(id);
  }

  @Mutation(() => Story)
  async createStory(
    @Args('newStory') newStory: StoryInput,
  ) {
    return this.storyService.createStory(newStory);
  }
}
