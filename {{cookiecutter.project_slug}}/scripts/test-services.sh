#!/usr/bin/env bash
# Automated service health check script
set -e

echo "🧪 Testing FastAPI + React + SQLPage Services..."
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test HTTP endpoint
test_endpoint() {
    local url=$1
    local service=$2
    local expected=$3

    echo -n "Testing $service... "

    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")

    if [ "$response" = "$expected" ] || [ "$response" = "200" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $response)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $response)"
        return 1
    fi
}

# Function to check Docker container status
check_container() {
    local container=$1
    echo -n "Checking $container container... "

    if docker-compose ps | grep -q "$container.*Up"; then
        echo -e "${GREEN}✓ Running${NC}"
        return 0
    else
        echo -e "${RED}✗ Not running${NC}"
        return 1
    fi
}

# Initialize counters
total_tests=0
passed_tests=0

echo "📦 DOCKER CONTAINERS"
echo "--------------------"

containers=("nginx" "postgres" "redis" "backend" "worker" "flower" "frontend" "sqlpage" "pgadmin")
for container in "${containers[@]}"; do
    ((total_tests++))
    if check_container "$container"; then
        ((passed_tests++))
    fi
done

echo ""
echo "🌐 HTTP ENDPOINTS"
echo "------------------"

# Test endpoints
endpoints=(
    "http://localhost:8000|Frontend|200"
    "http://localhost:8000/api/v1|API Root|200"
    "http://localhost:8000/api/docs|API Docs|200"
    "http://localhost:8000/admin|Admin Dashboard|200"
    "http://localhost:8000/sqlpage/|SQLPage|200"
    "http://localhost:5555|Flower|200"
    "http://localhost:5050|pgAdmin|200"
)

for endpoint in "${endpoints[@]}"; do
    IFS='|' read -r url service expected <<< "$endpoint"
    ((total_tests++))
    if test_endpoint "$url" "$service" "$expected"; then
        ((passed_tests++))
    fi
done

echo ""
echo "🔧 DATABASE CONNECTION"
echo "----------------------"

echo -n "Testing PostgreSQL connection... "
((total_tests++))
if docker-compose exec -T backend python -c "from app.db.session import SessionLocal; db = SessionLocal(); print('Connected')" 2>/dev/null | grep -q "Connected"; then
    echo -e "${GREEN}✓ Connected${NC}"
    ((passed_tests++))
else
    echo -e "${RED}✗ Failed${NC}"
fi

echo ""
echo "📊 RESULTS"
echo "=========="
echo "Total Tests: $total_tests"
echo "Passed: $passed_tests"
echo "Failed: $((total_tests - passed_tests))"

if [ $passed_tests -eq $total_tests ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Check logs with: docker-compose logs${NC}"
    exit 1
fi
