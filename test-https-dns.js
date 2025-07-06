/**
 * Test script to verify HTTPS DNS record functionality
 * 
 * This script simulates the validation of HTTPS DNS records in the CloudFormation template.
 * It checks that the template includes the necessary HTTPS record types for both the main domain
 * and redirect subdomain.
 */

const fs = require('fs');
const assert = require('assert');

try {
  console.log('Loading CloudFormation template...');
  const templateContent = fs.readFileSync('./template.yml', 'utf8');
  
  // Check for HTTPS record in WebRecordSetGroup
  console.log('Checking WebRecordSetGroup for HTTPS record...');
  const webRecordGroupMatch = templateContent.match(/WebRecordSetGroup:[\s\S]*?Type: "AWS::Route53::RecordSetGroup"/);
  assert(webRecordGroupMatch, 'WebRecordSetGroup not found in template');
  
  const webHttpsMatch = templateContent.match(/Type: HTTPS[\s\S]*?HTTPSConfig:[\s\S]*?CertificateAuthority: AMAZON[\s\S]*?Port: 443/);
  assert(webHttpsMatch, 'Valid HTTPS record configuration not found in WebRecordSetGroup');

  // Check for HTTPS record in RedirectRecordSetGroup
  console.log('Checking RedirectRecordSetGroup for HTTPS record...');
  const redirectRecordGroupMatch = templateContent.match(/RedirectRecordSetGroup:[\s\S]*?Type: "AWS::Route53::RecordSetGroup"/);
  assert(redirectRecordGroupMatch, 'RedirectRecordSetGroup not found in template');
  
  const redirectHttpsMatch = templateContent.match(/Type: HTTPS[\s\S]*?HTTPSConfig:[\s\S]*?CertificateAuthority: AMAZON[\s\S]*?Port: 443/g);
  assert(redirectHttpsMatch && redirectHttpsMatch.length >= 2, 'Valid HTTPS record configuration not found in RedirectRecordSetGroup');

  console.log('All tests passed! HTTPS DNS records are properly configured.');
} catch (error) {
  console.error('Test failed:', error.message);
  process.exit(1);
}