import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Authorized } from '../auth/auth.guard';
import { StoryFilter, StoryFilterForAdmin, StoryInput } from './story.input';
import { Story } from './story.model';
import { StoryService } from './story.service';

@Resolver()
export class StoryResolver {
  constructor(
    private storyService: StoryService
  ) {}

  @Query(() => [Story])
  getAllStories(
    @Args('filter', { type: () => StoryFilter, nullable: true }) filter: StoryFilter,
  ) {
    return this.storyService.getAllStories(filter);
  }

  @Query(() => Story)
  getStoryById(
    @Args('id', { type: () => ID }) id: Story['_id'],
  ) {
    return this.storyService.getStoryById(id);
  }

  @Mutation(() => Story)
  createStory(
    @Args('newStory') newStory: StoryInput,
  ) {
    return this.storyService.createStory(newStory);
  }

  @Authorized()
  @Query(() => [Story])
  getStoriesForAdmin(
    @Args('filter', { type: () => StoryFilterForAdmin }) filter: StoryFilterForAdmin
  ) {
    return this.storyService.getStoriesByFilter(filter);
  }

}
