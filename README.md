# Power-GYM

Power-GYM is a modern fitness club website built with React and Vite. It features user authentication, membership offers, class schedules, testimonials, and more. The project is organized for scalability and maintainability, with components grouped by feature.
## Current Status

- **Frontend:** Complete (React + Vite)
- **Pages:** Home, About, Login, Register
- **Components:** Hero, Membership, Offers, Perks, ClassTime, Programs, Testimonials, WhyChoose, Header, Footer, NavBar
- **Routing:** Implemented with React Router
- **Styling:** Custom CSS
- **Deployment:** Live on Vercel

## Project Structure

```
src/
	assets/           # Images and static assets
	components/       # Reusable UI components
		about/          # About page components
		auth/           # Authentication components
		Home/           # Home page components
		Layouts/        # Layout components (Header, Footer, NavBar)
	pages/            # Page-level components
	routes/           # App routing
	App.jsx           # Main app component
	main.jsx          # Entry point
	index.css         # Global styles
```

## Scripts

- `npm run dev` — Start development server ([http://localhost:5173](http://localhost:5173))
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## Deployment

The project is deployed on [Vercel](https://vercel.com/).

To deploy:
1. Push your latest changes to the main branch.
2. Run `vercel --prod` in the project directory.
3. Your site will be live at your Vercel domain.

## License

This project is licensed under the MIT License.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


