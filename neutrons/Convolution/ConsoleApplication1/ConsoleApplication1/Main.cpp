#include <iostream>
#include <vector>
#include <fstream>

#include "Math/Polynomial.h"
#include "Math/Interpolator.h"

#include <algorithm>

using namespace std;

double gauss(double x, double mean, double sigma)
{
	if (sigma == 0)
	{
		return 0;
	}

	const double pi = 3.1416;
	return 1 / (sqrt(2 * pi) * abs(sigma))  * exp(-pow(x - mean, 2.0) / (2 * sigma * sigma));
}

double func(double value)
{
	if (value < 0)
	{
		return 0;
	}

	return 0;
}




int main()
{
	FILE *f = fopen("D:\\git_repositories\\PhD_dark_matter\\neutrons\\Convolution\\data.dat", "r");
	ofstream file_out("D:\\git_repositories\\PhD_dark_matter\\neutrons\\Convolution\\out.dat");
	
	if (f == NULL)
	{
		cout << "Can't open this file: " << endl;
		system("pause");
	}

	double x, y;
	vector<double> xv;
	vector<double> yv;

	while (!feof(f))
	{
		fscanf(f, "%lf %lf\n", &x, &y);
		xv.push_back(x);
		yv.push_back(y);
	}

	//double range = 10;// 0 - 10
	//double N = 1000;
	//double st = double(range) / N;
	//cout << "st = " << st << endl;
	//
	//for (int i = 0; i < N; i++)
	//{
	//	xv.push_back(i*st);
	//	yv.push_back(1);
	//}

	

	

	//for (double i = -10; i < 25; i += 0.1)
	//{

	//	double value = 0;

	//	for (int j = 0; j < xv.size(); j++)
	//	{
	//		double dx = i - xv[j];
	//		value += yv[j] * gauss(dx, 0, 1) * step;
	//	}

	//	file_out << i << "\t" << value << endl;
	//}

	const double step = 0.01; // you have to change this parameter

	//Root cern interpolation
	//-----------------------------------------------------------------------------------
	int ni = xv.size();

	
	// You can choose among the following methods:
	// CSPLINE, LINEAR, POLYNOMIAL,
	// CSPLINE_PERIODIC, AKIMA, AKIMA_PERIODIC
	ROOT::Math::Interpolator inter(ni, ROOT::Math::Interpolation::kLINEAR);
	inter.SetData(xv, yv);

	for (double i = -10; i < 25; i += 0.1)
	{

		double value = 0;



		for (double j = 0; j <= *max_element(xv.begin(), xv.end()); j += step)
		{
			double dx = i - j;
			value += inter.Eval(j) * gauss(dx, 0, j*0.3) * step;

			//cout << j << "\t" << inter.Eval(j) << endl;
		}

		file_out << i << "\t" << value << endl;
		//system("pause");
	}


	//-----------------------------------------------------------------------------------


	//for (double i = 0; i < 250; i += 0.1)
	//{
	//	file_out << i << "\t" << inter.Eval(i) << endl;
	//}




	system("pause");
	return 0;
}