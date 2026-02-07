import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LogInPage } from "./features/auth/pages/LogInPage"
import { NotFoundPage } from "./features/misc/NotFoundPage"
import { HotelsPage } from "./features/hotels/pages/HotelsPage"
import { MainLayout } from "./components/layouts/MainLayout"
import { ProtectedRoute } from "./components/layouts/ProtectedRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="login" />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="hotels" element={<HotelsPage />} />
            </Route>
          </Route>
          <Route path="login" element={<LogInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
