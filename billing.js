// ========================================
// PALSANG'S CAFE - PREMIUM BILLING SYSTEM
// ========================================

let billItems = [];
let discountPercent = 0;
let discountFixed = 0;
let selectedPayment = null;
let currentBillNo = 'HAL' + Math.floor(Math.random() * 90000 + 10000);

// Format currency
const formatMoney = (val) => val.toFixed(2);

// Update date & time
function updateDateTime() {
  const now = new Date();
  document.getElementById('date').innerText = now.toLocaleDateString('en-GB');
  document.getElementById('time').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Generate new bill number
function generateBillNumber() {
  return 'HAL' + Math.floor(Math.random() * 90000 + 10000);
}

// Calculate totals
function calculateTotals() {
  const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discountAmount = discountPercent > 0 ? (subtotal * discountPercent / 100) : discountFixed;
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * 0.13; // 13% GST
  const grandTotal = afterDiscount + tax;
  
  return { subtotal, discountAmount, tax, grandTotal };
}

// Render invoice
function renderInvoice() {
  const tbody = document.getElementById('billItemsList');
  if (!tbody) return;
  
  if (billItems.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="5">✨ No items added — start billing ✨</td></tr>';
    updateTotalsDisplay();
    return;
  }
  
  tbody.innerHTML = billItems.map((item, idx) => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td>${item.qty}</td>
      <td>₹${formatMoney(item.price)}</td>
      <td>₹${formatMoney(item.price * item.qty)}</td>
      <td><button class="delete-item" onclick="removeItem(${idx})"><i class="fas fa-trash-alt"></i></button></td>
    </tr>
  `).join('');
  
  updateTotalsDisplay();
}

// Update totals display
function updateTotalsDisplay() {
  const { subtotal, discountAmount, tax, grandTotal } = calculateTotals();
  document.getElementById('subtotalVal').innerText = formatMoney(subtotal);
  document.getElementById('discountVal').innerText = formatMoney(discountAmount);
  document.getElementById('taxVal').innerText = formatMoney(tax);
  document.getElementById('grandTotalVal').innerText = formatMoney(grandTotal);
}

// Apply discount
function applyDiscount() {
  discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;
  discountFixed = parseFloat(document.getElementById('discountFixed').value) || 0;
  
  if (discountPercent > 0) {
    document.getElementById('discountFixed').value = 0;
    discountFixed = 0;
  } else if (discountFixed > 0) {
    document.getElementById('discountPercent').value = 0;
    discountPercent = 0;
  }
  
  renderInvoice();
}

// Add item
function addItemEnhanced() {
  let name = document.getElementById('itemName').value.trim();
  let price = parseFloat(document.getElementById('itemPrice').value);
  let qty = parseInt(document.getElementById('itemQty').value);
  
  if (!name) {
    alert('❌ Please enter item name!');
    return;
  }
  if (isNaN(price) || price <= 0) {
    alert('⚠️ Enter valid price!');
    return;
  }
  if (isNaN(qty) || qty < 1) {
    alert('⚠️ Quantity must be at least 1');
    return;
  }
  
  billItems.push({ name, price, qty });
  renderInvoice();
  
  // Clear fields
  document.getElementById('itemName').value = '';
  document.getElementById('itemPrice').value = '';
  document.getElementById('itemQty').value = '1';
  document.getElementById('itemName').focus();
}

// Remove item
function removeItem(index) {
  billItems.splice(index, 1);
  renderInvoice();
}

// Quick clear items
function quickClearItems() {
  if (billItems.length > 0 && confirm('⚠️ Clear all items?')) {
    billItems = [];
    renderInvoice();
  }
}

// Reset whole bill
function resetWholeBill() {
  if (confirm('🔄 Reset entire bill? This will clear all data.')) {
    billItems = [];
    discountPercent = 0;
    discountFixed = 0;
    selectedPayment = null;
    document.getElementById('discountPercent').value = 0;
    document.getElementById('discountFixed').value = 0;
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('previewName').innerText = '—';
    document.getElementById('previewPhone').innerText = '—';
    document.getElementById('previewAddress').innerText = '—';
    document.getElementById('paymentStatus').innerHTML = '';
    document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('selected'));
    renderInvoice();
    currentBillNo = generateBillNumber();
    document.getElementById('billNo').innerText = currentBillNo;
  }
}

// New bill
function newBill() {
  if (billItems.length > 0 && !confirm('Start new bill? Current bill will be saved in history.')) return;
  resetWholeBill();
}

// Select payment
function selectPayment(method, element) {
  selectedPayment = method;

  document.querySelectorAll('.payment-btn')
    .forEach(btn => btn.classList.remove('selected'));

  element.classList.add('selected');

  document.getElementById('paymentStatus')
    .innerHTML =
    `Payment: ${method.toUpperCase()} selected`;
}

// Print invoice
function printInvoice() {
  if (billItems.length === 0) {
    alert('❌ No items to print!');
    return;
  }
  if (!selectedPayment) {
    alert('⚠️ Please select payment method first!');
    return;
  }
  window.print();
}

// Download PDF simulation
function downloadPDF() {
  if (billItems.length === 0) {
    alert('❌ No items to download!');
    return;
  }
  alert('📄 PDF download ready! (Print → Save as PDF in print dialog)');
  window.print();
}

// Customer live update
function bindCustomerListeners() {
  ['customerName', 'customerPhone', 'customerAddress'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', function() {
      const previewId = 'preview' + id.replace('customer', '');
      const preview = document.getElementById(previewId);
      if (preview) preview.innerText = this.value.trim() || '—';
    });
  });
}

// Quick menu buttons
function initQuickMenu() {
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      document.getElementById('itemName').value = name;
      document.getElementById('itemPrice').value = price;
      document.getElementById('itemQty').value = '1';
      document.getElementById('itemPrice').focus();
    });
  });
}

// Keyboard shortcuts
function setupShortcuts() {
  const inputs = ['itemPrice', 'itemQty', 'itemName'];
  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (id === 'itemName') document.getElementById('itemPrice').focus();
        else if (id === 'itemPrice') document.getElementById('itemQty').focus();
        else if (id === 'itemQty') addItemEnhanced();
      }
    });
  });
}

// Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, (m) => {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('billNo').innerText = currentBillNo;
  updateDateTime();
  setInterval(updateDateTime, 60000);
  bindCustomerListeners();
  initQuickMenu();
  setupShortcuts();
  renderInvoice();
});

// Make functions global
window.addItemEnhanced = addItemEnhanced;
window.removeItem = removeItem;
window.quickClearItems = quickClearItems;
window.resetWholeBill = resetWholeBill;
window.newBill = newBill;
window.selectPayment = selectPayment;
window.printInvoice = printInvoice;
window.downloadPDF = downloadPDF;
window.applyDiscount = applyDiscount;