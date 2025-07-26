// pages/login.tsx (for Pages Router)
// OR
// app/login/page.tsx (for App Router)

import AuthFlowManager from './Components/AuthFlowManager';



export default function LoginPage() {
  return <AuthFlowManager />;
}

// If using App Router, you might need:
// export default function Page() {
//   return <AuthFlowManager />;
// }
