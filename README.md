# Eventer

A full-stack event application that enables the user to view, create and delete events.

## Demo

The following video shows viewing, creating and deleting event. It also shows that the site is responsive and has been built mobile-first.

![Demo Video](/docs/event-app.mp4)

## Getting Started

**To get the application running:**

1. Clone the repository:

   ```bash
   git clone https://github.com/ghtaylor/eventer-app.git
   ```

2. Navigate to the repository

   ```bash
   cd ./eventer-app
   ```

3. Duplicate `.env.example` and rename it to `.env`. You don't need to change the values. This is used by Docker in the next step.

4. Build the Docker images and start the containers in a detached state. _This step will also run database migrations to update the schema and seed some initial data._

   ```bash
   docker-compose up -d
   ```

You can now access the Next.js frontend at:

[http://localhost:4000](http://localhost:4000)

And the REST API at:

http://localhost:3000

## Project Structure

This repo utilises `pnpm workspaces` for monorepo tooling.

### /web

- The frontend of the application: Built using Next.js 14 and utilising the new `app` directory and its benefits.

- Completely responsive UI. The styling has been written mobile-first, with support for larger screen sizes. **Try resizing the window!**

- A conscious effort has been made to separate UI into meaningful components, including the usage of `forwardRef` and class name merging to provide control of the DOM element and component styling to the consumer.

- Utitilised [shadcn/ui](https://ui.shadcn.com/) for a number of components, to provide an accessible and easy-to-use interface.

- The app takes advantage of [Server-Side Rendering (SSR)](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch) to fetch events data for the index page and specific event data on the `/event/[id]` pages.

- Used [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) for mutation of data, such as creating a new event and deleting an existing event.

### /api

- REST API built using Express.

- Used Drizzle for ORM.

- Built some abstractions in as a proof of concept, but decided to stop spending time on this component to focus on the frontend.

### /db

- Contains the schemas for the database.

- This package is a dependency of both `/web` and `api`, as they import the schemas to ensure **full type-safety**.

- Contains the SQL migrations used to setup the schema of the database.

- Contains a seeding script used during the Docker build process.

## After thoughts

Things I'd do if I had more time, or general thoughts about decisions made.

### General

- On any serious application I would definitely write tests. For example, on the backend it would have been very valuable to write integration tests for the `EventRepository`, with a Postgres DB spun up in a container.
- This application isn't very scalable. In a Production environment, a lot more thought would go into the deployment of the different components and I'd probably opt to completely remove Express in favour of some form of serverless functions. Additionally, the Next.js server could be deployed utilising a CDN and Edge Functions.
- SQL isn't necessarily the way to go with this data structure, it was just an easy way of getting something up and running. For a high-demand application, the performance and scalability of the database would need to be strongly considered. A NoSQL database would be a completetly viable approach.

### Frontend

- Error handling for submission of the 'Create event' form. In case the API does not work expected, I'd like to handle this and provide information to the user via a Toast message.

- The 'Create event' form input fields for currency isn't totally natural and could be much improved:

  - Prefixed input value with a currency sign.
  - Sanitize the input `onBlur`... e.g. `£3.1` -> `£3.10`.
  - Create a `<CurrencyInput currencySign='£' />` component to encapsulate this and more logic.

- Some opt for making very atomic components, such as `<Heading />`, `<Subheading />`, `<Text />` etc. I feel like the benefit of Tailwind is that you can keep it simple and avoid component hell. I feel like [this is a great take on it](https://youtu.be/QBajvZaWLXs?si=aId6SUtwaN8dUeKf&t=74).

- I could've used some global state to build a Shopping Cart functionality; whether that'd been using React's native Context API or opting for a third-party library such as Zustand.

### Backend

- Use a service to store images, such as S3. Links to these images can then be stored against the database item. I went with storing the images in the frontend `/public` folder for the purposes of this demo.

- Generate the ID of the event using the name so that the frontend URL could appear friendler, making it easier for human reference.

- Better abstractions and dependency injection. Perhaps could use a framework like Nest.js.
