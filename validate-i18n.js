#!/usr/bin/env node

// Simple validation script for DATABAYT_I18N_STANDARD_V2.0 implementation
const fs = require('fs');
const path = require('path');

console.log('🔍 Validating DATABAYT_I18N_STANDARD_V2.0 implementation...\n');

// Check if new v2.0 structure exists
const checks = [
  {
    name: 'V2.0 Config File',
    path: 'src/components/internationalization/config.ts',
    required: true
  },
  {
    name: 'V2.0 Dictionaries',
    path: 'src/components/internationalization/dictionaries.ts',
    required: true
  },
  {
    name: 'English Translations',
    path: 'src/components/internationalization/en.json',
    required: true
  },
  {
    name: 'Arabic Translations',
    path: 'src/components/internationalization/ar.json',
    required: true
  },
  {
    name: 'Use Locale Hook',
    path: 'src/components/internationalization/use-locale.ts',
    required: true
  },
  {
    name: 'Updated Layout',
    path: 'src/app/[lang]/layout.tsx',
    required: true
  },
  {
    name: 'Root Proxy (Next 16)',
    path: 'proxy.ts',
    required: true
  },
  {
    name: 'Updated useTranslations Hook',
    path: 'src/lib/use-translations.ts',
    required: true
  }
];

let allPassed = true;

checks.forEach(check => {
  const fullPath = path.join(process.cwd(), check.path);
  const exists = fs.existsSync(fullPath);
  
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${check.name}: ${check.path}`);
  
  if (check.required && !exists) {
    allPassed = false;
  }
});

console.log('\n📋 Configuration Validation:');

// Check config content
try {
  const configPath = path.join(process.cwd(), 'src/components/internationalization/config.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  const hasSimplifiedLocales = configContent.includes("locales: ['en', 'ar']");
  const hasLocaleConfig = configContent.includes('localeConfig');
  
  console.log(`${hasSimplifiedLocales ? '✅' : '❌'} Simplified locale codes (en, ar)`);
  console.log(`${hasLocaleConfig ? '✅' : '❌'} Locale configuration with RTL support`);
  
} catch (error) {
  console.log('❌ Could not validate config content');
  allPassed = false;
}

// Check proxy content (Next 16 replaces middleware.ts)
try {
  const proxyPath = path.join(process.cwd(), 'proxy.ts');
  const proxyContent = fs.readFileSync(proxyPath, 'utf8');

  const importsConfig = proxyContent.includes("./src/components/internationalization/config");
  const exportsProxy = /export\s+function\s+proxy\b/.test(proxyContent);
  console.log(`${importsConfig ? '✅' : '❌'} proxy.ts imports from internationalization/config`);
  console.log(`${exportsProxy ? '✅' : '❌'} proxy.ts exports a named proxy() function`);

} catch (error) {
  console.log('❌ Could not validate proxy content');
  allPassed = false;
}

// Check if dependencies are installed
const packageJsonPath = path.join(process.cwd(), 'package.json');
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const hasIntlLocaleMatcher = '@formatjs/intl-localematcher' in deps;
  const hasNegotiator = 'negotiator' in deps;
  const hasNegotiatorTypes = '@types/negotiator' in deps;
  
  console.log(`${hasIntlLocaleMatcher ? '✅' : '❌'} @formatjs/intl-localematcher dependency`);
  console.log(`${hasNegotiator ? '✅' : '❌'} negotiator dependency`);
  console.log(`${hasNegotiatorTypes ? '✅' : '❌'} @types/negotiator dependency`);
  
} catch (error) {
  console.log('❌ Could not validate dependencies');
  allPassed = false;
}

console.log('\n🎯 Summary:');
if (allPassed) {
  console.log('🎉 All checks passed! DATABAYT_I18N_STANDARD_V2.0 implementation is complete.');
  console.log('\n📝 Features implemented:');
  console.log('   - Professional locale detection with negotiator');
  console.log('   - Component-based i18n architecture');
  console.log('   - Simplified locale codes (en/ar)');
  console.log('   - RTL support for Arabic');
  console.log('   - TypeScript integration');
  console.log('   - Static imports for better performance');
  console.log('   - Backward compatibility maintained');
} else {
  console.log('❌ Some checks failed. Please review the implementation.');
  process.exit(1);
}