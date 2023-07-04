import { Routes, Route } from 'react-router-dom'
import { Welcome } from './pages/Welcome'
import { Events } from './pages/Events'
import { Presence } from './pages/Presence'
import { ListPresents } from './pages/ListPresents'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Presence" element={<Presence />} />
        <Route path="/ListPresents" element={<ListPresents />} />
      </Route>
    </Routes>
  )
}
