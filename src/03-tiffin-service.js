/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if (typeof name !== "string" || !name || mealType === undefined) {
    return null
  }
  const rates = {
    veg: 80,
    nonveg: 120,
    jain: 90
  }
  if (!rates[mealType]) return null
  let dailyRate = 0
  if (mealType === "veg") {
    dailyRate = 80
  }
  else if (mealType === "nonveg") {
    dailyRate = 120
  }
  else {
    dailyRate = 90
  }
  let totalCost = dailyRate * days
  return {
    name,
    mealType,
    days,
    dailyRate,
    totalCost
  }
}

export function combinePlans(...plans) {
  // Your code here
  if (plans.length === 0) return null
  let totalCustomers = plans.length
  let totalRevenue = 0
  let mealBreakdown = { veg: 0, nonveg: 0 }
  for (let plan of plans) {
    totalRevenue += plan.totalCost
    if (!mealBreakdown[plan.mealType]) {
      mealBreakdown[plan.mealType] = 1
    } else {
      mealBreakdown[plan.mealType]++
    }
  }

  return { totalCustomers, totalRevenue, mealBreakdown }
}

export function applyAddons(plan, ...addons) {
  if (!plan) return null
  let extraCost = 0
  let addonNames = []
  for (let addon of addons) {
    extraCost += addon.price
    addonNames.push(addon.name)
  }
  const newDailyRate = plan.dailyRate + extraCost
  const newTotalCost = newDailyRate * plan.days
  return {
    ...plan,
    dailyRate: newDailyRate,
    totalCost: newTotalCost,
    addonNames
  }
}
