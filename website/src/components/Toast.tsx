import './Toast.css'

interface ToastProps {
  visible: boolean
}

export default function Toast({ visible }: ToastProps) {
  return (
    <div className={`toast ${visible ? 'show' : ''}`}>
      Copiado!
    </div>
  )
}
