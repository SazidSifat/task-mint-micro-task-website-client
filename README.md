# Micro-Task and Earning Platform

A modern and responsive web platform where users complete small tasks to earn rewards or create tasks to get work done. Built using React, TailwindCSS, Firebase, and other modern technologies.

## Live Site

Visit the live site here:  
https://mircotask-c344d.web.app/

## Admin Access

- Email: admin@admin.com
- Password: Admin@123

> Please replace the above credentials and URL with your actual admin info and deployment link.

---

## Technologies Used

- React.js
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Axios
- SwiperJS (for sliders)
- React Hook Form with YUP validation
- imgBB API (for image uploading)
- Stripe (for payments)
- JWT (using Firebase tokens)
- Responsive design for mobile, tablet, and desktop

---

## Key Features

1. Authentication with role-based access control (Worker, Buyer, Admin)
2. Task management system enabling Buyers to create, update, and delete tasks
3. Coin-based reward system:
   - Buyers spend coins to create tasks
   - Workers earn coins by completing tasks
4. Withdrawal system for Workers with business logic (20 Coins = 1 USD)
5. Stripe payment integration allowing Buyers to purchase coins securely
6. Real-time notification system for task status and payment updates
7. Customized dashboards tailored to each user role
8. Detailed payment history and task review system
9. Image uploading via imgBB for profile pictures and task images
10. Fully responsive user interface across all devices including dashboard layouts

---

---

## Setup Instructions

1. Clone this repository to your local machine
2. Run `npm install` to install all dependencies
3. Create a `.env` file at the root with your Firebase config, MongoDB URI, Stripe keys, and any other environment variables (do not commit this file)
4. Run `npm start` to launch the development server locally
5. To build for production, run `npm run build` and deploy the contents of the `build/` folder to your hosting service

---

## Important Notes

- All sensitive keys and credentials are stored in environment variables for security
- After login, the user session persists on page reload without redirecting to the login page
- No placeholder or Lorem Ipsum text is used anywhere in the app
- The “Join as Developer” button links to this client-side GitHub repository
- The UI and dashboards are fully responsive on mobile, tablet, and desktop screen sizes

---

If you encounter any issues or have questions, please feel free to reach out.
