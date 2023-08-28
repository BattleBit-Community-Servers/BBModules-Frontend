import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import {Button} from "../components/ui/button.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Button>
          <p>Hello World!</p>
      </Button>
  </React.StrictMode>,
)
