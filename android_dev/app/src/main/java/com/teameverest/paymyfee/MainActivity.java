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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        displayStudentListFragment();

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

    public void displayStudentListFragment() {
        // update the main content by replacing fragments
        fragmentManager = getSupportFragmentManager();
        transaction = fragmentManager.beginTransaction();
        fragment = new StudentListFragment();

        Bundle args = new Bundle();
        if (args != null) {
            args.putString("id", "1234");
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
        // update the main content by replacing fragments
        transaction = getSupportFragmentManager().beginTransaction();
        fragment = new StudentDetailsFragment();
        fragment.setArguments(bndlArgs);

        transaction.replace(R.id.frame_container, fragment, "StudentDetailsFragment");
        transaction.addToBackStack(null);
        transaction.commit();
    }

}
