using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using EasySpeedyMortgages.Models.DataModels;
using static EasySpeedyMortgages.Models.DataModels.InitialBorrowerInfoDataModel;

namespace EasySpeedyMortgages.Tests.Models.DataModels
{
    /// <summary>
    /// Summary description for InitialBorrowerInfoDataModelTests
    /// </summary>
    [TestClass]
    public class InitialBorrowerInfoDataModelTests
    {
        InitialBorrowerInfoDataModel _initialBorrowerInfoDataModel = new InitialBorrowerInfoDataModel();

        public InitialBorrowerInfoDataModelTests()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region Additional test attributes
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Use TestInitialize to run code before running each test 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion

        [TestMethod]
        public void InsertRecord()
        {
            var p = new InitialBorrowerParameters()
            {
                CreditQualityId = 1,
                Email = "InsertRecordUnitTest@test.com",
                FirstName = "Testy",
                LastName = "Testerson",
                LoanAmount = 70001,
                LoanTypeId = 1,
                PhoneNumber = "407-000-0000",
                PropertyValue = 80001,
                ReferringOfficerId = null
            };

            var result = _initialBorrowerInfoDataModel.InsertRecord(p);
            Assert.IsTrue(result.IsSuccessful);
        }
    }
}
