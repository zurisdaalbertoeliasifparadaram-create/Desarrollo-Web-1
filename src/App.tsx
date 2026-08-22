// src/App.tsx
import Header from './layouts/Header'
import EmployeesPage from './pages/EmployeesPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <EmployeesPage />
      </main>
    </div>
  )
}

export default App
