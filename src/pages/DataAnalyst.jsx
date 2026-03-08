import React from 'react';
import GlassCard from '../components/GlassCard';
import { Database, LineChart, Server, LayoutDashboard, FileSpreadsheet } from 'lucide-react';

const DataAnalyst = () => {
  return (
    <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <section className="text-center mb-20 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white flex items-center justify-center gap-4">
          <Database size={48} className="text-gray-300" /> Data Analytics
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          I transform raw, messy data into clear, actionable insights. By leveraging statistical
          analysis and powerful visualization tools, I help drive informed decision-making.
        </p>
      </section>

      <section className="mb-24 animate-fade-in-up animation-delay-300">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">Core Competencies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <LayoutDashboard className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">Data Visualization</h3>
            <p className="text-sm text-gray-400">
              Creating intuitive dashboards using Tableau, Power BI, and Python libraries to tell
              stories with data.
            </p>
          </GlassCard>

          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <Server className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">Data Engineering</h3>
            <p className="text-sm text-gray-400">
              Designing ETL pipelines and optimizing SQL queries to ensure data integrity and
              accessibility.
            </p>
          </GlassCard>

          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <LineChart className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">Statistical Analysis</h3>
            <p className="text-sm text-gray-400">
              Applying hypothesis testing, regression models, and A/B testing to uncover hidden
              trends.
            </p>
          </GlassCard>

          <GlassCard className="text-center hover:-translate-y-2 transition-transform">
            <FileSpreadsheet className="mx-auto mb-4 text-gray-300" size={40} />
            <h3 className="text-xl font-bold text-gray-200 mb-2">Data Cleaning</h3>
            <p className="text-sm text-gray-400">
              Using Python (Pandas/NumPy) to preprocess and wrangle massive datasets form messy
              sources.
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="animate-fade-in-up animation-delay-600">
        <h2 className="text-3xl font-bold mb-8 text-white border-b border-white/10 pb-4">
          Selected Analytics Projects
        </h2>

        <div className="space-y-8">
          {/* Project 1 */}
          <GlassCard className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-black/50 rounded-xl flex items-center justify-center p-8 border border-white/5">
              <LineChart size={64} className="text-gray-500 opacity-50" />
            </div>
            <div className="md:w-2/3 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-200 mb-3">
                E-Commerce Sales Forecasting
              </h3>
              <p className="text-gray-400 mb-6">
                Developed a time-series forecasting model using Python to predict quarterly sales.
                Integrated data from multiple SQL databases and created an interactive Tableau
                dashboard for stakeholders to monitor KPIs in real-time.
              </p>
              <div className="flex gap-3 mt-auto flex-wrap">
                <span className="px-3 py-1 text-xs font-semibold bg-white/10 text-gray-300 rounded-full">
                  Python
                </span>
                <span className="px-3 py-1 text-xs font-semibold bg-white/10 text-gray-300 rounded-full">
                  SQL
                </span>
                <span className="px-3 py-1 text-xs font-semibold bg-white/10 text-gray-300 rounded-full">
                  Tableau
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Project 2 */}
          <GlassCard className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-black/50 rounded-xl flex items-center justify-center p-8 border border-white/5">
              <Database size={64} className="text-gray-500 opacity-50" />
            </div>
            <div className="md:w-2/3 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-200 mb-3">Customer Churn Analysis</h3>
              <p className="text-gray-400 mb-6">
                Analyzed user behavior data to identify key metrics indicating potential churn.
                Cleaned a dataset of 500k+ records and built a logistic regression model, ultimately
                providing actionable retention strategies.
              </p>
              <div className="flex gap-3 mt-auto flex-wrap">
                <span className="px-3 py-1 text-xs font-semibold bg-white/10 text-gray-300 rounded-full">
                  Pandas
                </span>
                <span className="px-3 py-1 text-xs font-semibold bg-white/10 text-gray-300 rounded-full">
                  SciKit-Learn
                </span>
                <span className="px-3 py-1 text-xs font-semibold bg-white/10 text-gray-300 rounded-full">
                  Excel
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default DataAnalyst;
