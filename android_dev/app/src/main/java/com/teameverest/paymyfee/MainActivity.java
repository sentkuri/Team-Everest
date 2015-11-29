package com.teameverest.paymyfee;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    FragmentManager fragmentManager;
    FragmentTransaction transaction;
    Fragment fragment = null;

    FloatingActionButton fab = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                switch (Constants.WHICHFRAGMENT) {
                    case "ADD":
                        Snackbar.make(view, "Student Details Saved", Snackbar.LENGTH_LONG)
                                .setAction("Action", null).show();
                        break;
                    case "LIST":
                        addStudentDetailsFragment();
                        break;
                    case "DETAILS":
                        Snackbar.make(view, "Student is mapped for the benefit", Snackbar.LENGTH_LONG)
                                .setAction("Action", null).show();
                        break;
                }
            }
        });
        Constants.ClearStudentList();
        homeScreenFragment();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void homeScreenFragment() {
        fab.setVisibility(View.GONE);
        // update the main content by replacing fragments
        fragmentManager = getSupportFragmentManager();
        transaction = fragmentManager.beginTransaction();
        fragment = new HomeScreenFragment();

        Bundle args = new Bundle();
        if (args != null) {
            args.putString("id", "1234");
        }

        if (fragment != null) {
            fragment.setArguments(args);
            transaction.replace(R.id.frame_container, fragment, "HomeScreenFragment");
            //transaction.addToBackStack(fragName);
            transaction.addToBackStack(null);
            transaction.commit();
        }
    }

    public void displayStudentListFragment(String queryString) {
        fab.setVisibility(View.VISIBLE);
        fab.setImageResource(R.drawable.add_student);
        // update the main content by replacing fragments
        fragmentManager = getSupportFragmentManager();
        transaction = fragmentManager.beginTransaction();
        fragment = new StudentListFragment();

        Bundle args = new Bundle();
        if (args != null) {
            args.putString("querystring", queryString);
        }

        if (fragment != null) {
            fragment.setArguments(args);
            transaction.replace(R.id.frame_container, fragment, "StudentListFragment");
            //transaction.addToBackStack(fragName);
            transaction.addToBackStack(null);
            transaction.commit();
        }
    }

    public void displayStudentDetailsFragment(Bundle bndlArgs) {

        fab.setImageResource(R.drawable.abc_btn_rating_star_off_mtrl_alpha);
        // update the main content by replacing fragments
        transaction = getSupportFragmentManager().beginTransaction();
        fragment = new StudentDetailsFragment();
        fragment.setArguments(bndlArgs);

        transaction.replace(R.id.frame_container, fragment, "StudentDetailsFragment");
        transaction.addToBackStack(null);
        transaction.commit();
    }

    public void addStudentDetailsFragment() {

        fab.setImageResource(R.drawable.abc_btn_check_to_on_mtrl_015);
        // update the main content by replacing fragments
        transaction = getSupportFragmentManager().beginTransaction();
        fragment = new AddStudentDetailsFragment();

        transaction.replace(R.id.frame_container, fragment, "AddStudentDetailsFragment");
        transaction.addToBackStack(null);
        transaction.commit();
    }

    public void advSearchFragment() {

        fab.setVisibility(View.GONE);
        //fab.setImageResource(R.drawable.abc_btn_check_to_on_mtrl_015);
        // update the main content by replacing fragments
        transaction = getSupportFragmentManager().beginTransaction();
        fragment = new AdvancedSearchFragment();

        transaction.replace(R.id.frame_container, fragment, "AdvancedSearchFragment");
        transaction.addToBackStack(null);
        transaction.commit();
    }

}
