/**
 * Test script to verify HTTPS DNS record functionality
 * 
 * This script simulates the validation of HTTPS DNS records in the CloudFormation template.
 * It checks that the template includes the necessary HTTPS record types for both the main domain
 * and redirect subdomain.
 */

const fs = require('fs');
const yaml = require('js-yaml');
const assert = require('assert');

// Load the CloudFormation template
try {
  console.log('Loading CloudFormation template...');
  const templateContent = fs.readFileSync('./template.yml', 'utf8');
  const template = yaml.load(templateContent);
  
  // Check WebRecordSetGroup for HTTPS record
  console.log('Checking WebRecordSetGroup for HTTPS record...');
  const webRecordSets = template.Resources.WebRecordSetGroup.Properties.RecordSets;
  const webHttpsRecord = webRecordSets.find(record => record.Type === 'HTTPS');
  
  assert(webHttpsRecord, 'HTTPS record not found in WebRecordSetGroup');
  assert(webHttpsRecord.HTTPSConfig, 'HTTPSConfig not found in HTTPS record');
  assert(webHttpsRecord.HTTPSConfig.CertificateAuthority === 'AMAZON', 
    'CertificateAuthority should be AMAZON');
  assert(webHttpsRecord.HTTPSConfig.Port === 443,
    'Port should be 443 for HTTPS');
  
  // Check RedirectRecordSetGroup for HTTPS record
  console.log('Checking RedirectRecordSetGroup for HTTPS record...');
  const redirectRecordSets = template.Resources.RedirectRecordSetGroup.Properties.RecordSets;
  const redirectHttpsRecord = redirectRecordSets.find(record => record.Type === 'HTTPS');
  
  assert(redirectHttpsRecord, 'HTTPS record not found in RedirectRecordSetGroup');
  assert(redirectHttpsRecord.HTTPSConfig, 'HTTPSConfig not found in HTTPS record');
  assert(redirectHttpsRecord.HTTPSConfig.CertificateAuthority === 'AMAZON', 
    'CertificateAuthority should be AMAZON');
  assert(redirectHttpsRecord.HTTPSConfig.Port === 443,
    'Port should be 443 for HTTPS');
  
  console.log('All tests passed! HTTPS DNS records are properly configured.');
} catch (error) {
  console.error('Test failed:', error.message);
  process.exit(1);
}