import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Welcome } from './pages/Welcome'
import { Events } from './pages/Events'
import { Presence } from './pages/Presence'
import { ListPresents } from './pages/ListPresents'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Cart } from './components/Cart'

export function Router() {
  const router = createBrowserRouter([
    {
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Welcome />,
        },
        {
          path: '/Events',
          element: <Events />,
        },
        {
          path: '/Presence',
          element: <Presence />,
        },
        {
          path: '/ListPresents',
          element: <ListPresents />,
        },
        {
          element: <Cart />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}
