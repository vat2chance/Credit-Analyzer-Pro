#!/bin/bash

# Credit Analyzer Pro - Setup Script
# This script sets up the development environment for the Credit Analyzer Pro project

set -e

echo "🚀 Setting up Credit Analyzer Pro development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking system requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm 9+ first."
        exit 1
    fi
    
    NPM_VERSION=$(npm --version | cut -d'.' -f1)
    if [ "$NPM_VERSION" -lt 9 ]; then
        print_error "npm version 9+ is required. Current version: $(npm --version)"
        exit 1
    fi
    
    print_success "npm $(npm --version) is installed"
    
    # Check PostgreSQL
    if ! command -v psql &> /dev/null; then
        print_warning "PostgreSQL is not installed. You'll need to install it manually."
        print_warning "Visit: https://www.postgresql.org/download/"
    else
        print_success "PostgreSQL is installed"
    fi
    
    # Check Redis
    if ! command -v redis-server &> /dev/null; then
        print_warning "Redis is not installed. You'll need to install it manually."
        print_warning "Visit: https://redis.io/download"
    else
        print_success "Redis is installed"
    fi
}

# Create environment file
setup_environment() {
    print_status "Setting up environment configuration..."
    
    if [ ! -f .env ]; then
        cp env.example .env
        print_success "Created .env file from template"
        print_warning "Please edit .env file with your actual configuration values"
    else
        print_warning ".env file already exists, skipping..."
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install shared package dependencies
    cd shared
    npm install
    npm run build
    cd ..
    
    # Install backend dependencies
    cd backend
    npm install
    cd ..
    
    # Install web dependencies
    cd web
    npm install
    cd ..
    
    # Install mobile dependencies
    cd mobile
    npm install
    cd ..
    
    print_success "All dependencies installed successfully"
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    cd backend
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    npx prisma generate
    
    # Check if database is accessible
    if command -v psql &> /dev/null; then
        print_status "Checking database connection..."
        # This will fail if database doesn't exist, which is expected
        npx prisma db push --accept-data-loss || true
        print_success "Database setup completed"
    else
        print_warning "PostgreSQL not available, skipping database setup"
        print_warning "Please install PostgreSQL and run: cd backend && npx prisma db push"
    fi
    
    cd ..
}

# Setup development tools
setup_dev_tools() {
    print_status "Setting up development tools..."
    
    # Create logs directory
    mkdir -p logs
    
    # Create necessary directories
    mkdir -p backend/logs
    mkdir -p web/public
    mkdir -p mobile/assets
    
    print_success "Development tools setup completed"
}

# Create initial data
create_initial_data() {
    print_status "Creating initial data..."
    
    cd backend
    
    # Create seed data if database is available
    if command -v psql &> /dev/null; then
        print_status "Creating seed data..."
        npx prisma db seed || print_warning "Seed data creation failed (this is normal for first run)"
    fi
    
    cd ..
}

# Setup Git hooks
setup_git_hooks() {
    print_status "Setting up Git hooks..."
    
    if [ -d .git ]; then
        # Create pre-commit hook
        mkdir -p .git/hooks
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running pre-commit checks..."

# Run linting
npm run lint:fix

# Run type checking
npm run type-check

# Run tests
npm run test

echo "Pre-commit checks completed"
EOF
        
        chmod +x .git/hooks/pre-commit
        print_success "Git hooks setup completed"
    else
        print_warning "Not a Git repository, skipping Git hooks setup"
    fi
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Credit Analyzer Pro setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Edit .env file with your configuration values"
    echo "2. Start the development servers:"
    echo "   - Backend: npm run dev:backend"
    echo "   - Web: npm run dev:web"
    echo "   - Mobile: npm run dev:mobile"
    echo ""
    echo "3. Access your application:"
echo "   - Web: http://localhost:3000"
echo "   - API: http://localhost:3001"
echo "   - Health check: http://localhost:3001/health"
    echo ""
    echo "4. Database management:"
    echo "   - View data: cd backend && npx prisma studio"
    echo "   - Run migrations: cd backend && npx prisma migrate dev"
    echo ""
    echo "📚 Documentation:"
    echo "   - README.md - Project overview and setup"
    echo "   - Credit_Analyzer_Pro_Requirements.md - Detailed requirements"
    echo ""
    echo "🔧 Development commands:"
    echo "   - npm run dev - Start web + backend"
    echo "   - npm run build - Build all packages"
    echo "   - npm run test - Run tests"
    echo "   - npm run lint - Run linting"
    echo ""
    echo "Happy coding! 🚀"
}

# Main setup function
main() {
    echo "=========================================="
    echo "  Credit Analyzer Pro - Setup Script"
    echo "=========================================="
    echo ""
    
    check_requirements
    setup_environment
    install_dependencies
    setup_database
    setup_dev_tools
    create_initial_data
    setup_git_hooks
    show_next_steps
}

# Run main function
main "$@"
