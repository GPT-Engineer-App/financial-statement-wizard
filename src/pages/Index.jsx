import React, { useState } from 'react';
import { Container, VStack, Input, Button, Text, Box, FormControl, FormLabel, Alert, AlertIcon } from "@chakra-ui/react";

const Index = () => {
  const [balanceSheet, setBalanceSheet] = useState('');
  const [incomeStatement, setIncomeStatement] = useState('');
  const [cashFlowStatement, setCashFlowStatement] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      setError('');
      // Validate inputs
      if (!balanceSheet || !incomeStatement || !cashFlowStatement) {
        throw new Error('All fields are required.');
      }

      // Parse inputs
      const balanceSheetData = parseFloat(balanceSheet);
      const incomeStatementData = parseFloat(incomeStatement);
      const cashFlowStatementData = parseFloat(cashFlowStatement);

      if (isNaN(balanceSheetData) || isNaN(incomeStatementData) || isNaN(cashFlowStatementData)) {
        throw new Error('Invalid input. Please enter valid numbers.');
      }

      // Calculate indirect cash flow (example calculation)
      const numerator = incomeStatementData + cashFlowStatementData;
      const denominator = balanceSheetData;
      const indirectCashFlow = numerator / denominator;

      // Set result
      setResult({
        numerator,
        denominator,
        indirectCashFlow,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Indirect Cash Flow Calculator</Text>
        <FormControl id="balance-sheet">
          <FormLabel>Balance Sheet</FormLabel>
          <Input type="text" value={balanceSheet} onChange={(e) => setBalanceSheet(e.target.value)} />
        </FormControl>
        <FormControl id="income-statement">
          <FormLabel>Income Statement</FormLabel>
          <Input type="text" value={incomeStatement} onChange={(e) => setIncomeStatement(e.target.value)} />
        </FormControl>
        <FormControl id="cash-flow-statement">
          <FormLabel>Cash Flow Statement</FormLabel>
          <Input type="text" value={cashFlowStatement} onChange={(e) => setCashFlowStatement(e.target.value)} />
        </FormControl>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Button colorScheme="blue" onClick={handleCalculate}>Calculate</Button>
        {result && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text>Numerator: {result.numerator}</Text>
            <Text>Denominator: {result.denominator}</Text>
            <Text>Indirect Cash Flow: {result.indirectCashFlow}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;