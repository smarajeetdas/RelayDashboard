import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointDetail, TestCase } from '../../models/endpoint.model';
import { EndpointService } from '../../services/endpoint.service';
import { SidebarItem } from '../../../../shared/components/detail-sidebar/detail-sidebar.component';

@Component({
  selector: 'app-endpoint-detail',
  templateUrl: './endpoint-detail.component.html',
  styleUrls: ['./endpoint-detail.component.css']
})
export class EndpointDetailComponent implements OnInit {
  endpoint: EndpointDetail | undefined;
  loading: boolean = true;
  activeTab: 'details' | 'parameters' | 'headers' | 'testCases' = 'details';
  error: string | null = null;
  
  // Sidebar configuration
  sidebarItems: SidebarItem[] = [
    { id: 'basic', icon: 'info-circle', label: 'Basic' },
    { id: 'environment', icon: 'globe', label: 'Environment' },
    { id: 'testdata', icon: 'database', label: 'Test data' },
    { id: 'associated', icon: 'link', label: 'Associated with' },
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'apitrends', icon: 'chart-line', label: 'API trends' },
    { id: 'execution', icon: 'tasks', label: 'Execution History' },
    { id: 'result', icon: 'clipboard-check', label: 'Result' }
  ];
  
  activeSidebarItem: string = 'basic';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private endpointService: EndpointService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadEndpointDetails(id);
      } else {
        this.error = 'No endpoint ID provided';
        this.loading = false;
      }
    });
  }

  loadEndpointDetails(id: string): void {
    this.loading = true;
    this.endpointService.getEndpointById(id).subscribe(
      endpoint => {
        this.endpoint = endpoint;
        this.loading = false;
        if (!endpoint) {
          this.error = 'Endpoint not found';
        }
      },
      error => {
        this.error = 'Error loading endpoint details';
        this.loading = false;
        console.error('Error loading endpoint details:', error);
      }
    );
  }
  
  onSidebarItemSelect(itemId: string): void {
    this.activeSidebarItem = itemId;
    console.log('Selected sidebar item:', itemId);
  }

  setActiveTab(tab: 'details' | 'parameters' | 'headers' | 'testCases'): void {
    this.activeTab = tab;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'passed':
        return 'success';
      case 'failed':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'passed':
        return 'check-circle';
      case 'failed':
        return 'times-circle';
      case 'pending':
        return 'clock';
      default:
        return 'question-circle';
    }
  }

  goBack(): void {
    this.router.navigate(['/endpoints']);
  }

  editEndpoint(): void {
    // Navigate to edit form or open edit modal
    console.log('Edit endpoint:', this.endpoint);
  }

  deleteEndpoint(): void {
    if (this.endpoint && confirm('Are you sure you want to delete this endpoint?')) {
      this.endpointService.deleteEndpoint(this.endpoint.id).subscribe(success => {
        if (success) {
          this.router.navigate(['/endpoints']);
        }
      });
    }
  }

  runTest(testCase: TestCase): void {
    // Implement test execution logic
    console.log('Run test case:', testCase);
  }
}