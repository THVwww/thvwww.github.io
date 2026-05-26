const { test, expect } = require('@playwright/test');


const BASE_URL = 'https://thvwww.github.io/'; 

test('1. Главная страница загружается', async ({ page }) => {
  await page.goto(BASE_URL);
  
 
  const searchInput = page.locator('.search-input');
  await expect(searchInput).toBeVisible();
  

  const micBtn = page.locator('#micBtn');
   await expect(micBtn).toHaveCount(1);
});

test('2. Успешный поиск погоды (с моком API)', async ({ page }) => {
  await page.route('**/data/2.5/weather*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        name: "Москва",
        main: { temp: 22, humidity: 65, feels_like: 20 },
        wind: { speed: 4 },
        weather: [{ main: "Clear" }]
      })
    });
  });

  await page.goto(BASE_URL);

  const searchInput = page.locator('.search-input');
  const searchBtn = page.locator('.search button').first();

  await searchInput.fill('Москва');
  await searchBtn.click();

  await expect(page.locator('.weather')).toBeVisible();
  await expect(page.locator('.city')).toContainText('Москва');
  await expect(page.locator('.temp')).toContainText('22');
});

test('3. Ошибка при несуществующем городе', async ({ page }) => {
  await page.route('**/data/2.5/weather*', async route => {
    await route.fulfill({ status: 404 });
  });

  await page.goto(BASE_URL);

  const searchInput = page.locator('.search-input');
  const searchBtn = page.locator('.search button').first();

  await searchInput.fill('Абракадабра');
  await searchBtn.click();

  await expect(page.locator('.error')).toBeVisible();
  await expect(page.locator('.weather')).toBeHidden();
});

test('4. Ошибка при пустом поле поиска', async ({ page }) => {
  await page.goto(BASE_URL);

  const searchBtn = page.locator('.search button').first();
  await searchBtn.click();

  await expect(page.locator('.err')).toBeVisible();
});

test('5. Кнопка микрофона ведет себя корректно', async ({ page, browserName }) => {
  await page.goto(BASE_URL);
  
  const micBtn = page.locator('#micBtn');
  

  if (browserName === 'chromium') {
    await expect(micBtn).toBeVisible();
    await micBtn.click();
    await expect(micBtn).toHaveClass(/listening/);
  } 
  else {
    await expect(micBtn).toBeHidden();
  }
});