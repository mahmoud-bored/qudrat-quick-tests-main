import './style.sass'
import { startTest } from './examOperations.js'
import { end } from './testResults'

// Test Start
document.querySelector('.test-start-button').onclick = startTest
// Test Instant End Button
document.querySelector('.test-end-button').onclick = end