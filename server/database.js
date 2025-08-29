const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_FILE = path.join(__dirname, 'donations.json');

class DonationDatabase {
  constructor() {
    this.donations = [];
    this.loadDonations();
  }

  async loadDonations() {
    try {
      const data = await fs.readFile(DB_FILE, 'utf8');
      this.donations = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      this.donations = [];
      await this.saveDonations();
    }
  }

  async saveDonations() {
    try {
      await fs.writeFile(DB_FILE, JSON.stringify(this.donations, null, 2));
    } catch (error) {
      console.error('Failed to save donations:', error);
    }
  }

  async addDonation(donationData) {
    const donation = {
      id: uuidv4(),
      ...donationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.donations.push(donation);
    await this.saveDonations();
    return donation;
  }

  async updateDonation(id, updates) {
    const index = this.donations.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error('Donation not found');
    }

    this.donations[index] = {
      ...this.donations[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.saveDonations();
    return this.donations[index];
  }

  async getDonation(id) {
    return this.donations.find(d => d.id === id);
  }

  async getAllDonations() {
    return this.donations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getDonationsByEmail(email) {
    return this.donations.filter(d => d.donorInfo?.email === email);
  }

  async getPublicDonations(includeAnonymous = false) {
    return this.donations
      .filter(d => d.isPublic && (includeAnonymous || d.donorInfo?.firstName))
      .map(d => ({
        id: d.id,
        amount: d.amount,
        isMonthly: d.isMonthly,
        donorName: d.donorInfo?.firstName ? `${d.donorInfo.firstName} ${d.donorInfo.lastName || ''}`.trim() : 'Anonymous',
        message: d.message || '',
        createdAt: d.createdAt,
        isAnonymous: !d.donorInfo?.firstName
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async deleteDonation(id) {
    const index = this.donations.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error('Donation not found');
    }

    this.donations.splice(index, 1);
    await this.saveDonations();
    return true;
  }
}

module.exports = new DonationDatabase();

