import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Authorized } from '../auth/auth.guard';
import { ChangeStoryStateInput, newStoryInput, StoryFilter, StoryFilterForAdmin } from './story.input';
import { Story } from './story.model';
import { StoryService } from './story.service';
import { StoryState } from './story.type';

@Resolver()
export class StoryResolver {
  constructor(
    private storyService: StoryService
  ) {}

  @Query(() => [Story])
  getAllStories(
    @Args('filter', { type: () => StoryFilter, nullable: true }) filter: StoryFilter,
  ) {
    return this.storyService.getStoriesByFilter(filter);
  }

  @Query(() => Story)
  getStoryById(
    @Args('id', { type: () => ID }) id: Story['_id'],
  ) {
    return this.storyService.getStoryById(id);
  }

  @Mutation(() => Story)
  createStory(
    @Args('newStory') newStory: newStoryInput,
  ) {
    return this.storyService.createStory(newStory);
  }

  @Authorized()
  @Query(() => [Story])
  getStoriesForAdmin(
    @Args('filter', { type: () => StoryFilterForAdmin }) filter: StoryFilterForAdmin
  ) {
    return this.storyService.getStoriesByFilterForAdmin(filter);
  }

  @Authorized()
  @Mutation(() => Story)
  approveStoryById(
    @Args('input', { type: () => ChangeStoryStateInput}) input: ChangeStoryStateInput
  ) {
    return this.storyService.changePendingStoryStateById(input.id, StoryState.APPROVED);
  }

  @Authorized()
  @Mutation(() => Story)
  rejectStoryById(
    @Args('input', { type: () => ChangeStoryStateInput}) input: ChangeStoryStateInput
  ) {
    return this.storyService.changePendingStoryStateById(input.id, StoryState.REJECTED);
  }

}
