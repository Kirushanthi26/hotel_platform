import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LogInPage } from "./features/auth/pages/LogInPage"
import { NotFoundPage } from "./features/misc/NotFoundPage"
import { HotelsPage } from "./features/hotels/pages/HotelsPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="login" />} />
          <Route path="hotels" element={<HotelsPage />} />

          <Route path="login" element={<LogInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
