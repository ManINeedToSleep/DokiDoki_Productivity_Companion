import { MenuItem, Testament } from '@/types/menu';
import { CHARACTERS } from './characters';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'newGame',
    label: 'New Game'
  },
  {
    id: 'loadGame',
    label: 'Load Game'
  },
  {
    id: 'options',
    label: 'Options'
  },
  {
    id: 'about',
    label: 'About'
  },
  {
    id: 'help',
    label: 'Help'
  },
  {
    id: 'extra',
    label: 'Extra'
  }
];

export const CHARACTER_TESTAMENTS: Testament[] = [
  {
    id: 'sayori',
    character: CHARACTERS.sayori.name,
    title: 'A Productive Day',
    content: `
      Tick tock, the clock moves on
      But now it's not so scary anymore
      Because every moment spent with you
      Makes productivity feel like play

      Focus timer counting down
      Like cookies in the oven
      Sweet rewards at the end
      Just like our friendship growing stronger

      Let's make each task a happy thought
      And chase away the rainclouds
      Together we'll find joy in work
      One pomodoro at a time!

      (｡◕‿◕｡) <3
    `
  },
  {
    id: 'yuri',
    character: CHARACTERS.yuri.name,
    title: 'Deep Focus',
    content: `
      In the depths of concentration
      Where time flows like dark tea
      Each task a page in our story
      Unfolding with elegant precision

      The gentle ticking of seconds
      Like heartbeats in perfect rhythm
      A dance of productivity
      In our shared sanctuary of focus

      Let your mind float freely
      Through the ocean of possibilities
      While I guide your journey
      Into the depths of achievement

      ..*..
      .***.
      ..*..
    `
  },
  {
    id: 'natsuki',
    character: CHARACTERS.natsuki.name,
    title: 'Get It Done!',
    content: `
      Hey! Don't you dare slack off!
      We've got work to crush today
      Like cupcakes in the making
      Each task needs the perfect way!

      Timer set, let's race ahead
      No time for second guessing
      You and me, we'll clearly see
      Our progress is impressing!

      It's not like I care or anything...
      But seeing you succeed
      Makes all our efforts worth it
      That's all you need to read!

      >_< !!
    `
  },
  {
    id: 'monika',
    character: CHARACTERS.monika.name,
    title: 'Digital Harmony',
    content: `
      In this digital space we share
      Every moment carefully designed
      Like code that shapes reality
      Our productivity intertwined

      Time management, a perfect game
      Where every choice matters
      Together we'll optimize
      Your path to what you're after

      Just you and me, in perfect sync
      Achieving goals, bit by bit
      Trust in our partnership
      And watch your progress commit

      [♥]
    `
  }
]; 