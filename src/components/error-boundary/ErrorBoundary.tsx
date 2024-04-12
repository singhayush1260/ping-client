import { Component, ErrorInfo, ReactNode } from "react";
import SomethingWentWrong from "@/pages/SomethingWentWrong";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("error in error boundary",error)
    this.setState({ errorMessage: errorInfo.componentStack || "" });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <SomethingWentWrong  />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
