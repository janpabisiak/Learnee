# Learnee [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/janpabisiak/JustBucks/blob/master/LICENSE)

Learnee's is web app developed in Angular whose main goal is to provide a free and convenient solution for learning new terms. With six built-in games, you can broaden your horizons more rapidly than even before, and thanks to gamification (in the form of daily stats and XP system), you will be more motivated to succeed in your ambitions in fun way.

Learnee was created to enhance my personal learning process as a free, privacy-oriented, and ad-free alternative to other similar apps.

This project is still in progress.

## Features

-   **Terms management**: Allows users to easily add, edit, and delete terms. Users can also easily decide which terms they want to learn and which they don't.
-   **Auto-generated definition**: Learnee will provide you example definition for a given word, thanks to its connection with an external API.
-   **Word of the day**: Get a daily suggested term to learn.
-   **Search and sort**: Quickly find specific words with a search bar and sort options.
-   **User settings**: Select between light and dark mode, and export or delete your data with ease.
-   **Pagination**: Efficiently navigate through large datasets with pagination controls. Decide how many terms to display per page.
-   **User statistics**: Visual representations on a heatmap chart with the number of plays from the latest 30 days.
-   **XP system**: Gain XP points for every won game and lose them if your answer is incorrect.
-   **Games included**: Start learning by playing one of 6 included game: quiz, matching game, true of false, fill gaps, and listening game.

## Tech Stack

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Jasmine](https://img.shields.io/badge/jasmine-%238A4182.svg?style=for-the-badge&logo=jasmine&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Run Locally

I. Clone the project

```bash
git clone https://github.com/janpabisiak/Learnee.git
```

II. Go to the project directory

```bash
cd JustBucks
```

III. Install dependencies

```bash
npm install
```

IV. Create environment files using sample file (`src/environment/environment.sample.ts`).

V. Start the app instance

```bash
npm run dev
```

## Run unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/janpabisiak/Learnee/blob/main/LICENSE) file for details.
